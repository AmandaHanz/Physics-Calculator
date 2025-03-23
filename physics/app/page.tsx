import ConstantsTable from '@/components/ConstantsTable';
import Calculator from '@/components/Calculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Physics Constants Calculator</h1>
          <p className="text-muted-foreground">
            Quick reference for physics constants and formula calculations
          </p>
        </div>

        <Tabs defaultValue="constants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="constants">Constants</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>
          <TabsContent value="constants" className="mt-6">
            <ConstantsTable />
          </TabsContent>
          <TabsContent value="calculator" className="mt-6">
            <Calculator />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}