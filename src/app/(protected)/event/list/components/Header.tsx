import { Badge } from "@/components/ui/badge";

const OrganizerEventListHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl">Twoje wydarzenia</div>
      <div className="flex gap-5">
        Legenda statusów:
        <span>
          <Badge variant={"green"}>Aktywne</Badge>
        </span>
        <span>
          <Badge variant={"blue"}>W trakcie akceptacji</Badge>
        </span>
        <span>
          <Badge variant={"yellow"}>Nieaktywne</Badge>
        </span>
        <span>
          <Badge variant={"gray"}>Zakończone</Badge>
        </span>
      </div>
    </div>
  );
};

export default OrganizerEventListHeader;
