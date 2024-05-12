import CardWrapper from "@/components/cards/CardWrapper";

const Page = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <CardWrapper
        title="Sign-In"
        description="Use your Account credentials"
        question="You dont have an account?"
        redirect="SignUp"
        modal={false}
      >
        <div>Form content</div>
      </CardWrapper>
    </main>
  );
};
export default Page;
