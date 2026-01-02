"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {  Eye, EyeOff } from "lucide-react";
import { createTeacherAction, updateTeacherAction } from "@/actions/super-admin/teacher-actions";
import { CreateTeacherPayload, UpdateTeacherPayload } from "@/lib/superadmin/teacher-operations";
import { successToast, errorToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/common/Button";

const createTeacherSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    mobile_no: z.string().optional(),
});

const editTeacherSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    mobile_no: z.string().optional(),
});

type CreateTeacherFormData = z.infer<typeof createTeacherSchema>;
type EditTeacherFormData = z.infer<typeof editTeacherSchema>;
type TeacherFormData = CreateTeacherFormData | EditTeacherFormData;

interface TeacherFormProps {
    mode: "create" | "edit";
    schoolId: string;
    initialData?: Partial<CreateTeacherFormData> & Partial<EditTeacherFormData> & { id?: string };
    onSuccess: () => void;
    onCancel: () => void;
}

export function TeacherForm({
    mode,
    schoolId,
    initialData,
    onSuccess,
    onCancel,
}: TeacherFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<TeacherFormData>({
        resolver: zodResolver(mode === "create" ? createTeacherSchema : editTeacherSchema),
        defaultValues: mode === "create" ? {
            name: initialData?.name || "",
            email: (initialData as any)?.email || "",
            password: "",
            mobile_no: initialData?.mobile_no || "",
        } : {
            name: initialData?.name || "",
            mobile_no: initialData?.mobile_no || "",
        },
    });

    const handleSubmit = async (data: TeacherFormData) => {
        setIsLoading(true);
        try {
            if (mode === "create") {
                const createData = data as CreateTeacherFormData;
                if (!createData.password) {
                    form.setError("password", { message: "Password is required for new teachers" });
                    setIsLoading(false);
                    return;
                }
                
                const payload: CreateTeacherPayload = {
                    school_id: parseInt(schoolId),
                    teacher_name: createData.name,
                    teacher_email: createData.email,
                    teacher_password: createData.password,
                    teacher_mobile_no: createData.mobile_no || "",
                };

                const result = await createTeacherAction(payload);
                if (result.success) {
                    successToast(result.message || "Teacher created successfully!");
                    // router.push("/super-admin/school-users");
                    onSuccess();
                } else {
                    errorToast(result.error || "Failed to create teacher");
                }
            } else if (mode === "edit") {
                const editData = data as EditTeacherFormData;
                const payload: UpdateTeacherPayload = {
                    teacher_id: parseInt(initialData?.id as string),
                    is_active: true,
                    name: editData.name,
                    mobile_no: editData.mobile_no || "",
                };

                const result = await updateTeacherAction(payload);
                if (result.success) {
                    successToast(result.message || "Teacher updated successfully!");
                    onSuccess();
                } else {
                    errorToast(result.error || "Failed to update teacher");
                }
            }
        } catch (error: any) {
            errorToast(
                error.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-6">
                <div className={`grid grid-cols-1 gap-4 ${mode === "create" ? "md:grid-cols-2" : ""}`}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter teacher's full name"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {mode === "create" && (
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className={`grid grid-cols-1 gap-4 ${mode === "create" ? "md:grid-cols-2" : ""}`}>
                    {mode === "create" && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                {...field}
                                                disabled={isLoading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="mobile_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter phone number"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                    </div>
                    <div className="col-span-1">
                    </div>
                    <CommonButton
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="w-full flex-1 h-10 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 "
                    >
                        Cancel
                    </CommonButton>
                    <CommonButton 
                        type="submit"
                        disabled={isLoading} 
                        loading={isLoading}
                        className="flex-1 h-10 rounded-lg bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 transition-colors duration-200"
                    >
                        {mode == "create" ? "Add Teacher" : "Update Teacher"}
                    </CommonButton>
                </div>
            </form>
        </Form>
    );
}
