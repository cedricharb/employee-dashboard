import React, { useState } from "react";
import { Employee } from "../lib/types/employee";

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (employee: Employee) => void;
}

// This component is the form we use to add and edit employees

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [employee, setEmployee] = useState<Employee>(
    initialData || {
      id: "",
      name: "",
      title: "",
      department: "",
      location: "",
      picture: "",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
  };

  const validateForm = () => {
    // Made it like this in case other fields are also required
    const newErrors: { [key: string]: string } = {};

    if (!employee.name) {
      // We can do this for any field that we see fit
      newErrors.name = "Name is required";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      // Check for errors in required fields
      setErrors(validationErrors);
    } else {
      onSubmit(employee); // If we found no errors we submit the edit/add
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-bold mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label className="block font-bold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={employee.title}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div>
        <label className="block font-bold mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.department && (
          <p className="text-red-500">{errors.department}</p>
        )}
      </div>
      <div>
        <label className="block font-bold mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={employee.location}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}
      </div>
      <div>
        <label className="block font-bold mb-1">Picture URL</label>
        <input
          type="text"
          name="picture"
          value={employee.picture}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.picture && <p className="text-red-500">{errors.picture}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
