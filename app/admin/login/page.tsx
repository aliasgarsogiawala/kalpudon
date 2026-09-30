import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center px-5">
      <div className="w-full max-w-[380px]">
        <p className="display text-[26px]">Kalpesh Kinariwala</p>
        <p className="t-note mt-1 text-gold-soft">Site admin</p>
        <LoginForm />
      </div>
    </main>
  );
}
