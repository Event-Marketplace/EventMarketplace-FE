import { Badge } from "@/components/ui/badge";

const OrganizerEventListHeader = () => {
  return (
    <div className="flex justify-between items-center gap-5 2xl:flex-nowrap flex-wrap ">
      <div className="text-2xl">Twoje wydarzenia</div>
      <div className="flex flex-wrap gap-5">
        Legenda statusów:
        <span>
          <Badge variant={"green"}>Aktywne</Badge>
        </span>
        <span>
          <Badge variant={"blue"}>Wysłane do akceptacji</Badge>
        </span>
        <span>
          <Badge variant={"red"}>Odrzucone</Badge>
        </span>
        <span>
          <Badge variant={"yellow"}>Zarchiwizowane</Badge>
        </span>
        <span>
          <Badge variant={"gray"}>Nieaktywne</Badge>
        </span>
        <span>
          <Badge variant={"default"}>Usunięte</Badge>
        </span>
      </div>
    </div>
  );
};

export default OrganizerEventListHeader;
