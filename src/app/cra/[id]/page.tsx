import CRAPreview from "./CRAPreview";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CRAPage({ params }: Props) {
  const { id } = await params;
  return <CRAPreview id={id} />;
}
