import { Button } from "@supabase/ui";
import { ChevronRight } from "react-feather";

const NextStepButton = ({ text, ...props }: { text: string, [key: string]: any }) => {
  return (
    <Button block className="mt-3" {...props}>
      <div className="flex items-center gap-3">
        {text}
        <ChevronRight size={15} />
      </div>
    </Button>
  );
}
export default NextStepButton;