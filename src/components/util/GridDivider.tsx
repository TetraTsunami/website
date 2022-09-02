export default function GridDivider({ name }: {name: string}) {
    return (<h2 className="block text-left font-bold text-2xl border-b-2 border-b-gray-400 py-2 my-4 col-span-full">
       {name}
    </h2>)
}