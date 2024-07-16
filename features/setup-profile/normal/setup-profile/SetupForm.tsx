"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/store/profileStore";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  profile_picture: z.any(),
  account_name: z.string().min(5).max(15).regex(/^@/, {
    message: "Account name must start with @",
  }),
  introduce: z.string().max(140).optional(),
});

type Props = {
  user: User;
};

const SetupForm = ({ user }: Props) => {
  const { Profile, setProfile, fetchUserProfile } = useProfileStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      account_name: "",
      introduce: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.account_name.startsWith('@')) {
      values.account_name = `@${values.account_name}`
    }
    try {
      const { data: existingAccount, error: accountError } = await supabase.from("Profiles").select("*").eq("account_name", values.account_name);

      if(existingAccount && existingAccount.length > 0) {
        toast({
          title: "Error",
          description: "An account with this name already exists.",
          variant: "destructive",
        });
        return;
      }

      const file = values.profile_picture[0];
      const fileName = `${user.user_id}/${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile")
        .upload(fileName, file);

      console.log("uploadData:", uploadData);

      if (uploadError) {
        toast({
          title: "Error",
          description:
            "An error occurred while uploading your profile picture.",
          variant: "destructive",
        });
        return;
      }

      const filePath = uploadData.fullPath;

      if (!filePath) {
        toast({
          title: "Error",
          description: "File path is not available.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("Profiles")
        .update({
          username: values.username,
          profile_picture: filePath,
          is_first_login: false,
          account_name: values.account_name,
          introduce: values.introduce,
        })
        .eq("user_id", user.user_id);

      if (error) {
        toast({
          title: "Error",
          description: "An error occurred while saving your profile data.",
          variant: "destructive",
        });
        console.error("Error updating data:", error);
      } else {
        toast({
          title: "✅ Success!!",
          description: "Your profile has been successfully submitted.",
        });

        setProfile({
          user_id: user.user_id,
          email: user.email || "",
          username: values.username,
          profile_picture: filePath,
          created_at: user.created_at,
          is_first_login: false,
          account_name: values.account_name,
          introduce: values.introduce || "",
        });
        router.push("/home");
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="@account_name" {...field} />
              </FormControl>
              <FormDescription>
                This will be your unique account name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introduce" // 新しいフィールド
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduce</FormLabel>
              <FormControl>
                <Textarea placeholder="Introduce yourself" {...field} />
              </FormControl>
              <FormDescription>
                Tell us a bit about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <FormControl>
            <Input type="file" {...form.register("profile_picture")} />
          </FormControl>
          <FormDescription>This is your profile picture.</FormDescription>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SetupForm;
