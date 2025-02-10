'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, PackageType } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";

interface PackageFormProps {
  package?: Package;
  isEdit?: boolean;
}

export default function PackageForm({ package: packageData, isEdit }: PackageFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    details: packageData?.details || "",
    type: packageData?.type || PackageType.BEACH,
    customType: packageData?.customType || "",
    amount: packageData?.amount || "",
    duration: packageData?.duration || "",
    nights: packageData?.nights || "",
  });

  const [includedText, setIncludedText] = useState(
    packageData?.included ? packageData.included.join('\n') : ''
  );
  
  const [excludedText, setExcludedText] = useState(
    packageData?.excluded ? packageData.excluded.join('\n') : ''
  );

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    packageData?.imageUrl || null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting form data:", formData);
      console.log("Included text:", includedText);
      console.log("Excluded text:", excludedText);

      const included = includedText
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');

      const excluded = excludedText
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');

      const url = isEdit 
        ? `/api/packages/${packageData?.id}` 
        : "/api/packages";
      
      const method = isEdit ? "PATCH" : "POST";

      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      formDataToSend.append('included', JSON.stringify(included));
      formDataToSend.append('excluded', JSON.stringify(excluded));

      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }

      toast.success(isEdit ? "Package updated successfully!" : "Package created successfully!");
      router.push("/management-portal/manage-packages");
      router.refresh();
      
    } catch (error) {
      console.error("Error saving package:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'amount' || name === 'duration' || name === 'nights') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be less than 4MB");
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto font-sans">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Package Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            placeholder="Enter package name"
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Package Details
          </label>
          <textarea
            id="details"
            name="details"
            required
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            placeholder="Enter package details"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Package Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
          >
            {Object.values(PackageType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {formData.type === PackageType.OTHER && (
          <div>
            <label htmlFor="customType" className="block text-sm font-medium text-gray-700">
              Custom Type
            </label>
            <input
              type="text"
              id="customType"
              name="customType"
              required
              value={formData.customType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
              placeholder="Enter custom type"
            />
          </div>
        )}

<div>
  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
    Amount (USD)
  </label>
  <input
    type="number"
    id="amount"
    name="amount"
    required
    value={formData.amount}
    onChange={handleChange}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
    placeholder="Enter amount"
    min="0"
    step="any"
  />
</div>

        <div>
          <label htmlFor="included" className="block text-sm font-medium text-gray-700">
            Included Items (one per line)
          </label>
          <textarea
            id="included"
            value={includedText}
            onChange={(e) => setIncludedText(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            placeholder="Enter included items (one per line)"
          />
        </div>

        <div>
          <label htmlFor="excluded" className="block text-sm font-medium text-gray-700">
            Excluded Items (one per line)
          </label>
          <textarea
            id="excluded"
            value={excludedText}
            onChange={(e) => setExcludedText(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            placeholder="Enter excluded items (one per line)"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (days)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            required
            min="1"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            placeholder="Enter duration in days"
          />
        </div>

        <div>
  <label htmlFor="nights" className="block text-sm font-medium text-gray-700">
    Nights
  </label>
  <input
    type="number"
    id="nights"
    name="nights"
    required
    min="0"
    value={formData.nights}
    onChange={handleChange}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
    placeholder="Enter number of nights"
  />
</div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Package Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-amber-50 file:text-amber-600
                hover:file:bg-amber-100"
            />
            {previewUrl && (
              <div className="relative h-20 w-20">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Max file size: 4MB. Supported formats: JPEG, PNG, WebP
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {isLoading ? 'Saving...' : isEdit ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  );
}