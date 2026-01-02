"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { errorToast, successToast } from "@/components/hooks/use-toast";

type DeleteUserDialogProps = Readonly<{
  userId: number;
  userName: string;
  userEmail: string;
  onDeleted?: (userId: number) => void;
}>;

export default function DeleteUserDialog(props: DeleteUserDialogProps) {
  const { userId, userName, userEmail, onDeleted } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!API_URL) {
        throw new Error("API URL not configured");
      }

      const token = localStorage.getItem("superAdminAccessToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${API_URL}/api/v1/admin/teachers/${userId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || (data.status && data.status !== 200)) {
        throw new Error(
          data.message || `Failed to delete teacher (${response.status})`
        );
      }

      successToast(`Teacher "${userName}" has been deleted successfully`);
      onDeleted?.(userId);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      errorToast(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete the user
            account.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="space-y-2">
            <div className="font-medium text-red-800">User Details:</div>
            <div className="text-sm text-red-700">
              <div>
                <strong>Name:</strong> {userName}
              </div>
              <div>
                <strong>Email:</strong> {userEmail}
              </div>
              <div>
                <strong>ID:</strong> #{userId}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
