export default async function Page({
  params,
}: {
  params: Promise<{ apID: string }>;
}) {
  const { apID } = await params;

  return <div>{apID}</div>;
}
