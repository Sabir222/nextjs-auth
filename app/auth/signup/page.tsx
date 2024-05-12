import CardWrapper from "@/components/cards/CardWrapper";

const Page = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <CardWrapper
        title="Sign-Up"
        description="Create your account now"
        question="Do you have an account ?"
        redirect="SignIn"
        modal={false}
      >
        <div>Form content</div>
      </CardWrapper>
    </main>
  );
};
export default Page;
