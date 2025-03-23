'use client';

import { useState } from 'react';
import { PHYSICS_FORMULAS, formatScientific } from '@/lib/calculations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calculator as CalculatorIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Calculator() {
  const [selectedFormula, setSelectedFormula] = useState<string | undefined>();
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const formula = selectedFormula ? PHYSICS_FORMULAS[selectedFormula] : null;
  
  const calculateResult = () => {
    if (!formula) {
      setResult(null);
      return;
    }
    
    const hasAllParameters = formula.parameters.every(
      param => typeof parameters[param.symbol] === 'number' && !isNaN(parameters[param.symbol])
    );
    
    if (!hasAllParameters) {
      setResult(null);
      return;
    }
    
    try {
      const calculatedResult = formula.calculate(parameters);
      if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
        throw new Error('Invalid calculation result');
      }
      setError(null);
      setResult(calculatedResult);
    } catch (e) {
      setError('Invalid input parameters or calculation error');
      setResult(null);
    }
  };

  const handleParameterChange = (symbol: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setParameters(prev => ({
      ...prev,
      [symbol]: numValue
    }));
    setTimeout(calculateResult, 0);
  };

  const handleFormulaChange = (value: string) => {
    setSelectedFormula(value);
    setParameters({});
    setError(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CalculatorIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Advanced Physics Calculator</CardTitle>
              {formula && (
                <CardDescription className="mt-1 text-base">
                  {formula.description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Select Formula</Label>
            <Select
              value={selectedFormula}
              onValueChange={handleFormulaChange}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose a formula" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PHYSICS_FORMULAS).map(([key, formula]) => (
                  <SelectItem key={key} value={key} className="py-3">
                    <div>
                      <div className="font-medium">{formula.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">{formula.formula}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formula && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {formula.parameters.map((param) => (
                  <div key={param.symbol} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-base">
                        {param.name} ({param.unit})
                      </Label>
                      {param.description && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="p-3 max-w-xs">
                              <p>{param.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <Input
                      type="number"
                      placeholder={`Enter ${param.name.toLowerCase()}`}
                      value={parameters[param.symbol] || ''}
                      onChange={(e) => handleParameterChange(param.symbol, e.target.value)}
                      className="h-12"
                    />
                  </div>
                ))}
              </div>

              {error && (
                <Alert variant="destructive" className="mt-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="pt-6 border-t">
                <div className="text-sm text-muted-foreground font-medium">Result:</div>
                <div className="mt-2 text-3xl font-bold font-mono tracking-tight">
                  {result !== null ? (
                    <>
                      {formatScientific(result)} {formula.unit}
                    </>
                  ) : (
                    <span className="text-muted-foreground text-xl">
                      Awaiting valid input...
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}