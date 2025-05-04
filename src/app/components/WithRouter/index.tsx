import { useRouter, useSearchParams } from "next/navigation";

export function withRouter(Child: any) {
  const WrappedComponent = (props: any) => {
    const params = useSearchParams();
    const router = useRouter();
    return <Child {...props} params={params} router={router} />;
  };

  WrappedComponent.displayName = `withRouter(${Child.displayName || Child.name || "Component"})`;

  return WrappedComponent;
}