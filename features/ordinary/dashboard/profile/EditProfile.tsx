import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Profiles } from "@/types/custom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import useProfileStore from "@/store/profileStore";

const formSchema = z.object({
  username: z.string().min(1).max(50),
  profile_picture: z.any(),
  accountName: z.string().min(5).max(50),
  introduce: z.string().max(50).optional(),
});

const EditProfile = ({ profiles, onClose }: { profiles: Profiles, onClose: () => void  }) => {
  const { setProfile } = useProfileStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profiles.username ?? "",
      profile_picture: profiles.profile_picture ?? "",
      accountName: profiles.account_name ?? "",
      introduce: profiles.introduce ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let filePath = profiles.profile_picture;

      if (values.profile_picture && values.profile_picture.length > 0) {
        if (filePath) {
          const { error: deleteError } = await supabase.storage
            .from("profile")
            .remove([filePath]);

          if (deleteError) {
            toast({
              title: "Error",
              description: "An error occurred while deleting the old profile picture.",
              variant: "destructive",
            });
            console.error("Error deleting profile picture:", deleteError);
            return;
          }
        }
        
        const file = values.profile_picture[0];
        const fileName = `${profiles.user_id}/${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile")
          .upload(fileName, file);

        if (uploadError) {
          toast({
            title: "Error",
            description:
              "An error occurred while uploading your profile picture.",
            variant: "destructive",
          });
          return;
        }
        filePath = uploadData.path;
      }

      const { data, error } = await supabase
        .from("Profiles")
        .update({
          username: values.username,
          profile_picture: filePath,
          account_name: values.accountName,
          introduce: values.introduce,
        })
        .eq("user_id", profiles.user_id);

      if (error) {
        toast({
          title: "Error",
          description: "An error occurred while updating your profile.",
          variant: "destructive",
        });
        console.error("Error updating profile:", error);
      } else {
        toast({
          title: "✅ Success!!",
          description: "Your profile has been successfully updated.",
        });

        setProfile({
          user_id: profiles.user_id,
          email: profiles.email || "",
          username: values.username,
          profile_picture: filePath,
          created_at: profiles.created_at,
          is_first_login: false,
          account_name: values.accountName,
          introduce: values.introduce || "",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="@account name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <FormControl>
            <Input type="file" {...form.register("profile_picture")} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="introduce"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduce</FormLabel>
              <FormControl>
                <Textarea placeholder="your introduce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
