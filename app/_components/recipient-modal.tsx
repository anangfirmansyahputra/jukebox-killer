import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Song } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RecipientModalProps = {
  song: Song | null;
  setSelectedSong: (song: Song | null) => void;
};

// Validasi menggunakan Zod
const recipientName = z.union([z.string().min(1), z.literal("")]);

const formSchema = z.object({
  recipients: z.array(recipientName), // Array of strings
  message: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function RecipientModal({
  song,
  setSelectedSong,
}: RecipientModalProps) {
  const [isOpen, setIsOpen] = useState(song ? true : false);
  const [recipients, setRecipients] = useState<string[]>([""]); // Default recipient dengan string kosong

  useEffect(() => {
    setIsOpen(song ? true : false);
  }, [song]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipients: [],
      message: "",
      description: "",
    },
  });

  // Sinkronkan recipients ke react-hook-form
  useEffect(() => {
    form.setValue("recipients", recipients);
  }, [recipients, form]);

  function handleAddRecipient() {
    setRecipients([...recipients, ""]);
  }

  function handleRemoveRecipient(index: number) {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  }

  function handleRecipientChange(index: number, value: string) {
    const updatedRecipients = [...recipients];
    updatedRecipients[index] = value;
    setRecipients(updatedRecipients);
  }

  function onSubmit(values: FormData) {
    console.log("Submitted Data:", values);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        setSelectedSong(null);
      }}
    >
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Your dedication
          </DialogTitle>
          <DialogDescription className="text-center">
            Please fill in the recipient details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              {recipients.map((recipient, index) => (
                <FormItem key={index}>
                  <FormLabel>Recipient {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      className="text-gray-50 placeholder-gray-500 px-4 py-6 rounded-lg bg-gray-900/90"
                      value={recipient}
                      placeholder="Enter recipient name"
                      onChange={(e) =>
                        handleRecipientChange(index, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  {recipient.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleRemoveRecipient(index)}
                      className="text-red-600 hover:bg-transparent hover:text-red-600/60 p-0"
                    >
                      Remove
                    </Button>
                  )}
                </FormItem>
              ))}
              <Button
                type="button"
                className="text-pink-600 hover:bg-transparent hover:text-pink-600/60 p-0"
                variant="ghost"
                onClick={handleAddRecipient}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Recipient
              </Button>
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      className="text-gray-50 placeholder-gray-500 px-4 py-6 rounded-lg bg-gray-900/90"
                      placeholder="Message for my love"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full space-x-5 flex justify-between">
              <Button className="w-full">Upload Photo</Button>
              <Button className="w-full">Take Photo</Button>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button className="w-full" variant="success" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
