"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SkillDefinition } from "@/lib/calc/total";

interface SearchComboboxProps {
  placeholder?: string;
  onAdd?: (item: SkillDefinition) => void;
  items?: SkillDefinition[];
  onRemove?: (id: string) => void;
  onRemoveAll?: () => void;
  skills?: SkillDefinition[];
}

export function SearchCombobox({
  placeholder = "Search...",
  onAdd,
  items = [],
  onRemove,
  onRemoveAll,
  skills = [],
}: SearchComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<SkillDefinition[]>(items);

  const filteredSkills = useMemo(() => {
    if (!value) return [];
    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedItems.some((item) => item.name === skill.name),
    );
  }, [value, selectedItems]);

  const handleAdd = (itemToAdd?: SkillDefinition) => {
    const item =
      itemToAdd ||
      skills.find((s) => s.name.toLowerCase() === value.toLowerCase());

    if (item) {
      const newItem: SkillDefinition = {
        ...item,
      };
      const newItems = [...selectedItems, newItem];
      setSelectedItems(newItems);
      onAdd?.(newItem);
      setValue("");
      setOpen(false);
    }
  };

  const handleRemove = (name: string) => {
    const newItems = selectedItems.filter((item) => item.name !== name);
    setSelectedItems(newItems);
    onRemove?.(name);
  };

  const handleRemoveAll = () => {
    setSelectedItems([]);
    onRemoveAll?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const isValidSelection = skills.some(
    (s) =>
      s.name.toLowerCase() === value.toLowerCase() &&
      !selectedItems.some((item) => item.name === s.name),
  );

  return (
    <div className="w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setOpen(true);
                }}
                onKeyDown={handleKeyDown}
                className="pl-9 pr-10"
              />
              {value && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue("");
                    setOpen(false);
                  }}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
            <Button
              size="icon"
              onClick={() => handleAdd()}
              disabled={!isValidSelection}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandList>
              {filteredSkills.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredSkills.map((skill) => (
                    <CommandItem
                      key={skill.name}
                      onSelect={() => {
                        handleAdd(skill);
                      }}
                    >
                      {skill.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedItems.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Items ({selectedItems.length})
            </p>
            <Button variant="outline" size="sm" onClick={handleRemoveAll}>
              Remove All
            </Button>
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">Name</th>
                  <th className="p-2 text-left text-sm font-medium">
                    Aptitude
                  </th>
                  <th className="p-2 text-left text-sm font-medium">Score</th>
                  <th className="w-16 p-2 text-right text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-2 text-sm font-medium">{item.name}</td>
                    <td className="p-2 text-sm">
                      {item.aptitude ? (
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {item.aptitude}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-2 text-sm font-mono">
                      {item.fixedScore ?? item.defaultScore ?? 0}
                    </td>
                    <td className="p-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => handleRemove(item.name)}
                      >
                        <X className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
