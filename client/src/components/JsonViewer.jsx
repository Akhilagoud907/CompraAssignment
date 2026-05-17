export default function JsonViewer({ layout }) {
  return (
    <pre className="text-xs overflow-auto h-full bg-black text-green-400 p-4">
      {JSON.stringify(layout, null, 2)}
    </pre>
  );
}