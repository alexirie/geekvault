import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFigureById, updateFigure } from "../../../services/api";
import FigureForm from "../../../componentes/FigureForm";

export default function EditFigure() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [figure, setFigure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getFigureById(id).then(setFigure).catch((e) => setError(e.message));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
        console.log(id, data);
      await updateFigure(id, data);
      navigate("/admin/figuras");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  if (!figure) return <p>Cargando...</p>;

  return (
    <FigureForm
      initialData={figure}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}
