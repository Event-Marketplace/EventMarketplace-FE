import RegisterView from "@/components/authorization/register/RegisterView";
import AuthorizationLayout from "@/app/auth/layout";

export default function Register() {
  return (
    <AuthorizationLayout>
      <RegisterView />
    </AuthorizationLayout>
  );
}
