"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Add logic for form submission (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter event name"
          value={formData.name}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium">
          Description
        </Label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter event description"
          value={formData.description}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="isActive" className="text-sm">
          Is Active
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
