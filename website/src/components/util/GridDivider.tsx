export default function GridDivider({ name }: { name: string }) {
  return (
    <h2 className="col-span-full my-4 block border-b-2 border-b-gray-400 py-2 text-left text-2xl font-bold">
      {name}
    </h2>
  );
}
