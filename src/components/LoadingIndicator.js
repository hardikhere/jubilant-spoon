export default function LoadingIndicator() {
  return (
    <div className="flex items-center p-4">
      <svg
        className=" rounded-md animate-spin h-8 w-8 mr-3 border-4 border-indigo-400"
        fill="white"
        viewBox="0 0 24 24"
      ></svg>
      Loading..
    </div>
  );
}
