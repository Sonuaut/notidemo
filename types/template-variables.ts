export interface TemplateVariable {
  name: string
  description: string
}

export interface TemplateInstructions {
  title: string
  description: string
  variables: TemplateVariable[]
  example: {
    title: string
    content: string
  }
}

export interface TemplateVariables {
  staff: TemplateInstructions
  parent: TemplateInstructions
}

export const templateVariables: TemplateVariables = {
  staff: {
    title: "Staff Template Instructions",
    description: "Use curly braces {} to insert keywords that will be replaced dynamically.",
    variables: [
      { name: "{student_name}", description: "Student's full name" },
      { name: "{staff_name}", description: "Staff member's full name" },
      { name: "{teacher_name}", description: "Class teacher's name" },
     
    ],
    example: {
      title: "Example Template",
      content: `Dear {staff_name},

The following students were marked absent or found outside their designated area today: {student_name}. Please take the necessary steps to address this issue.
 
Best regards,  
{teacher_name}
 `
    }
  },
  parent: {
    title: "Parent Template Instructions",
    description: "Use curly braces {} to insert keywords that will be replaced dynamically.",
    variables: [
   { name: "{parent_name}", description: "Parent's full name" },
   { name: "{student_name}", description: "Student's full name" },
   { name: "{school_name}", description: "Name of the school" },
   { name: "{teacher_name}", description: "Class teacher's name" }
    ],
    example: {
      title: "Example Template",
      content: `Dear {parent_name},
 
We hope you are doing well. This is to inform you that {student_name} has shown some unusual behavior during today's class at {school_name}. We would like to work together with you to support {student_name} and ensure the best outcomes moving forward.
 
Please feel free to reach out if you would like to discuss this further. Your involvement plays a crucial role in {student_name}'s progress.
 
Best regards,  
{teacher_name}  
{school_name} `
    }
  }
} 