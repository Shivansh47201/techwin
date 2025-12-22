"use client";

import { Plus, Trash2 } from "lucide-react";

type Props = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
};

export default function ArrayEditor({
  label,
  items,
  onChange,
  placeholder,
}: Props) {
  function update(index: number, value: string) {
    const copy = [...items];
    copy[index] = value;
    onChange(copy);
  }

  function add() {
    onChange([...items, ""]);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-black">{label}</h3>
        <button
          onClick={add}
          className="flex items-center gap-1 text-[#3B9ACB]"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            onClick={() => remove(i)}
            className="text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      {!items.length && (
        <p className="text-sm text-gray-400">No items added</p>
      )}
    </div>
  );
}
