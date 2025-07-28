import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./App.css";
import UploadManager from "./components/UploadManager";

interface UploadFormValues {
  title: string;
  description: string;
  tags: string;
  category: string;
  problem: string;
  solution: string;
}

const initialValues: UploadFormValues = {
  title: "",
  description: "",
  tags: "",
  category: "",
  problem: "",
  solution: "",
};

const UploadSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  tags: Yup.string().required("Tags are required"),
  category: Yup.string().required("Category is required"),
  problem: Yup.string().required("Problem is required"),
  solution: Yup.string().required("Solution is required"),
});

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL((file as any).preview));
    };
  }, [files]);

  const handleSubmit = async (
    values: UploadFormValues,
    helpers: FormikHelpers<UploadFormValues>
  ) => {
    setLoading(true);
    setMessage("");

    const data = new FormData();
    files.forEach((file) => data.append("images", file));
    Object.entries(values).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await axios.post(`${apiUrl}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setMessage("✅ Upload successful!");
      setFiles([]);
      helpers.resetForm();
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-700 mb-8 tracking-tight">
        Kester Studios Uploads
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={UploadSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full space-y-6">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                {isDragActive
                  ? "📂 Drop your images..."
                  : "Drag & drop images here, or click to select files"}
              </p>
              {files.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="relative w-24 h-24 rounded overflow-hidden border border-gray-200"
                    >
                      <img
                        src={(file as any).preview}
                        alt={file.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Field
                  name="title"
                  placeholder="Image Title"
                  className="input-field"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="error-text"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Image Description"
                  rows={3}
                  className="input-field resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-text"
                />
              </div>

              <div>
                <Field
                  name="tags"
                  placeholder="Tags (comma separated)"
                  className="input-field"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="error-text"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="problem"
                  placeholder="Describe the Problem"
                  rows={3}
                  className="input-field resize-none"
                />
                <ErrorMessage
                  name="problem"
                  component="div"
                  className="error-text"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="solution"
                  placeholder="Describe the Solution"
                  rows={3}
                  className="input-field resize-none"
                />
                <ErrorMessage
                  name="solution"
                  component="div"
                  className="error-text"
                />
              </div>

              <div>
                <Field as="select" name="category" className="input-field">
                  <option value="">Select Category</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Blockchain Development">
                    Blockchain Development
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="2D/3D design">2D/3D Design</option>
                  <option value="Game Development">Game Development</option>
                  <option value="App Development">App Development</option>
                </Field>

                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-text"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition-all ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg"
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Media"}
            </button>

            {message && (
              <p className="text-center text-sm text-gray-600">{message}</p>
            )}
          </Form>
        )}
      </Formik>

      <UploadManager />
    </div>
  );
}

export default App;
