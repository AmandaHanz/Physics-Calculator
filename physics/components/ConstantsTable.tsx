'use client';

import { PHYSICS_CONSTANTS } from '@/lib/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ConstantsTable() {
  const [search, setSearch] = useState('');

  const filteredConstants = Object.entries(PHYSICS_CONSTANTS).filter(
    ([_, constant]) =>
      constant.name.toLowerCase().includes(search.toLowerCase()) ||
      constant.symbol.toLowerCase().includes(search.toLowerCase()) ||
      constant.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search constants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConstants.map(([key, constant]) => (
              <TableRow key={key}>
                <TableCell>{constant.name}</TableCell>
                <TableCell className="font-mono">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        {constant.symbol}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{constant.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="font-mono">
                  {constant.value.toExponential(10)}
                </TableCell>
                <TableCell>{constant.unit}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {constant.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}