module.exports = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(192, 192, 192, 0.75)",
    zIndex: 10,
  },
  content: {
    position: "fixed",
    width: "480px",
    padding: "10px",
    borderRadius: "15px 15px 15px 15px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    minHeight: "480px",
    height: "75%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
