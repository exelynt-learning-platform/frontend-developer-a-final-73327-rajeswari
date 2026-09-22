import { Alert } from "@mui/material";

export default function ErrorState({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <button onClick={onRetry} style={{ border: 0, background: "transparent", cursor: "pointer", fontWeight: 700 }}>
            Retry
          </button>
        ) : undefined
      }
    >
      {message}
    </Alert>
  );
}