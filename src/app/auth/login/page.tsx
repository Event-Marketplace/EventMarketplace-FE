import AuthorizationLayout from "@/app/auth/layout";
import LoginView from "@/components/authorization/login/LoginView";

export default function LoginPage() {
  return (
    <AuthorizationLayout>
      <LoginView />
    </AuthorizationLayout>
  );
}
