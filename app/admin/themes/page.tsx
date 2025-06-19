"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { SketchPicker } from "react-color";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface ThemeRow {
  id?: string;
  name: string;
  background: string;
  foreground: string;
  main_text: string;
  secondary_text: string;
  primary_color: string;
  secondary_color: string;
}

export default function ThemesPage() {
  const emptyTheme = (): ThemeRow => ({
    name: "",
    background: "#ffffff",
    foreground: "#000000",
    main_text: "#000000",
    secondary_text: "#666666",
    primary_color: "#007bff",
    secondary_color: "#6c757d",
  });

  const [themes, setThemes] = useState<ThemeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingNew, setAddingNew] = useState(false);
  const [newTheme, setNewTheme] = useState<ThemeRow>(emptyTheme());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTheme, setEditTheme] = useState<ThemeRow | null>(null);
  const [colorPicker, setColorPicker] = useState<{
    id: string | null;
    field: keyof ThemeRow | null;
    position: { top: number; left: number };
  }>({ id: null, field: null, position: { top: 0, left: 0 } });

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchThemes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setColorPicker({
          id: null,
          field: null,
          position: { top: 0, left: 0 },
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("themes").select("*");
    if (error) console.error("Veri çekme hatası:", error.message);
    else setThemes(data ?? []);
    setLoading(false);
  };

  const handleChange = (
    field: keyof ThemeRow,
    value: string,
    isEditing = false
  ) => {
    if (isEditing && editTheme) {
      setEditTheme((prev) => ({ ...prev!, [field]: value }));
    } else {
      setNewTheme((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setNewTheme(emptyTheme());
  };

  const handleSaveNew = async () => {
    const { data, error } = await supabase
      .from("themes")
      .insert([newTheme])
      .select();
    if (error) console.error("Ekleme hatası:", error.message);
    else if (data) {
      setThemes((prev) => [data[0], ...prev]);
      setAddingNew(false);
    }
  };

  const handleEdit = (theme: ThemeRow) => {
    setEditingId(theme.id ?? null);
    setEditTheme({ ...theme });
  };

  const handleSaveEdit = async () => {
    if (!editTheme?.id) return;
    const { error } = await supabase
      .from("themes")
      .update(editTheme)
      .eq("id", editTheme.id);
    if (error) console.error("Güncelleme hatası:", error.message);
    else {
      setThemes((prev) =>
        prev.map((t) => (t.id === editTheme.id ? editTheme : t))
      );
      setEditingId(null);
      setEditTheme(null);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const { error } = await supabase.from("themes").delete().eq("id", id);
    if (!error) {
      setThemes((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditTheme(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTheme(null);
  };

  const togglePicker = (
    e: React.MouseEvent,
    id: string,
    field: keyof ThemeRow
  ) => {
    if (!(editingId === id || id === "new")) {
      // Kopyalama davranışı
      const color = editingId === id ? editTheme?.[field] : newTheme[field];
      navigator.clipboard.writeText(color || "");
      return;
    }

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setColorPicker({
      id,
      field,
      position: { top: rect.bottom + window.scrollY, left: rect.left },
    });
  };

  const renderRow = (theme: ThemeRow, index: number, isNew = false) => {
    const isEditing = editingId === theme.id;
    const current = isEditing ? editTheme! : theme;

    return (
      <tr key={theme.id || index} className="border-t border-[var(--border)]">
        <td className="px-3 py-2">{index + 1}</td>
        <td className="px-3 py-2">
          {isEditing || isNew ? (
            <input
              type="text"
              value={current.name}
              onChange={(e) => handleChange("name", e.target.value, isEditing)}
              className="w-full px-2 py-1 bg-white text-black rounded"
            />
          ) : (
            <span>{current.name}</span>
          )}
        </td>
        {[
          "background",
          "foreground",
          "main_text",
          "secondary_text",
          "primary_color",
          "secondary_color",
        ].map((field) => (
          <td key={field} className="px-3 py-2 relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e) =>
                togglePicker(e, theme.id ?? "new", field as keyof ThemeRow)
              }
            >
              <div
                className="w-6 h-6 border border-gray-400 rounded"
                style={{ backgroundColor: current[field as keyof ThemeRow] }}
              />
              <span className="text-xs">
                {current[field as keyof ThemeRow]}
              </span>
            </div>
          </td>
        ))}
        <td className="px-3 py-2">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-700"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleDelete(theme.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </>
            ) : isNew ? (
              <>
                <button
                  onClick={handleSaveNew}
                  className="text-green-500 hover:text-green-700"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setAddingNew(false)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(theme)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(theme.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--navbar-bg)] text-[var(--foreground)]">
        <h1 className="text-2xl font-bold">Temalar</h1>
        {!addingNew && (
          <button
            onClick={handleAddNew}
            className="rounded-md px-3 py-1 text-sm bg-gray-300 text-gray-950 hover:bg-white hover:text-green-600 transition"
          >
            Tema Ekle
          </button>
        )}
      </div>

      {loading ? (
        <p className="p-4">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[var(--border)] text-sm">
            <thead className="bg-[var(--navbar-bg)] text-[var(--foreground)]">
              <tr>
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">Ad</th>
                <th className="px-3 py-2 text-left">Background</th>
                <th className="px-3 py-2 text-left">Foreground</th>
                <th className="px-3 py-2 text-left">Main Text</th>
                <th className="px-3 py-2 text-left">Secondary Text</th>
                <th className="px-3 py-2 text-left">Primary</th>
                <th className="px-3 py-2 text-left">Secondary</th>
                <th className="px-3 py-2 text-left">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {addingNew && renderRow(newTheme, 0, true)}
              {themes.map((theme, index) => renderRow(theme, index + 1))}
            </tbody>
          </table>
        </div>
      )}

      {colorPicker.id && colorPicker.field && (
        <div
          ref={pickerRef}
          className="absolute z-50"
          style={{
            top: colorPicker.position.top + 4,
            left: colorPicker.position.left,
          }}
        >
          <SketchPicker
            color={
              (editingId === colorPicker.id
                ? editTheme?.[colorPicker.field]
                : newTheme[colorPicker.field]) || "#000000"
            }
            onChangeComplete={(color) =>
              handleChange(
                colorPicker.field!,
                color.hex,
                editingId === colorPicker.id
              )
            }
          />
        </div>
      )}
    </div>
  );
}


/*

silme durumunda onay kutusu eklenecek
color picker renk seçildiğinde picker menüsündeki hex vs. yazması gerekiyor ve manuel girilebilir olması gerekiyor

*/