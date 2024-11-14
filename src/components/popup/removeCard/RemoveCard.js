import PopupWithForm from "../Popup";

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirmationSubmit,
}) {
  function handleConfirmationSubmit(e) {
    e.preventDefault();
    return onConfirmationSubmit();
  }

  return (
    <PopupWithForm
      title="Tem certeza?"
      name="popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmationSubmit}
    >
      <button className="formcard__delete" type="submit">
        Sim
      </button>
    </PopupWithForm>
  );
}