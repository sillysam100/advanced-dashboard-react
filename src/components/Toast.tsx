export default function Toast({ message }: { message: string }) {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
}
