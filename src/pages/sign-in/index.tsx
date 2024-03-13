import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthPageLayout from "@/layouts/authentication/AuthPageLayout";
import loginFormSchema from "@/validation/login.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { t } from "i18next";

const SignIn = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthPageLayout
      title={t("welcome-back")}
      subTitle="Enter your credentials to access your account"
      alternateRoute="/sign-up"
      alternateRouteText={t("sign-up")}
      isLoading={false}
      error=""
      clearError={() => {}}
    >
      <div className="w-5/6 md:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="flex w-full flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@iit.edu.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign In</Button>
          </form>
        </Form>
      </div>
    </AuthPageLayout>
  );
};

export default SignIn;
