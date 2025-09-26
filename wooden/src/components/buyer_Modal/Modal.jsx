export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-label="닫기"
      />
      <div className="modal-panel" role="dialog" aria-modal="true">
        {children}
      </div>
    </>
  );
}
