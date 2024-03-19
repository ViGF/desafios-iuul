import { VerifyPatientExists } from "../../useCases/patient/verify-patient-exists";
import { DeleteSchedule } from "../../useCases/schedule/delete-schedule";
import { IncludeSchedule } from "../../useCases/schedule/include-schedule";
import { ListSchedules } from "../../useCases/schedule/list-schedules";
import { ListSchedulesByDates } from "../../useCases/schedule/list-schedules-by-dates";
import { MainMenu } from "./MainMenu";
import { Menu } from "./Menu";
import { MenuPresentation } from "./MenuPresentation";
import { DeleteScheduleForm } from "./form/DeleteScheduleForm";
import { InsertScheduleForm } from "./form/InsertScheduleForm";
import { ScheduleListForm } from "./form/ScheduleListForm";

export class ScheduleMenu extends Menu {
  constructor() {
    super("Menu da Agenda", [
      "Agendar consulta",
      "Cancelar agendamento",
      "Listar agenda",
      "Voltar p/ menu principal",
    ]);
  }

  selectOption(option: number, menuPresentation: MenuPresentation) {
    switch (option) {
      case 1:
        const scheduleInfo = new InsertScheduleForm(menuPresentation.prompt).execute()
        const verifyPatientExists = new VerifyPatientExists(
          menuPresentation.patientRepository
        ).execute(scheduleInfo.cpf);

        if (!verifyPatientExists) {
          console.log("Erro: paciente não cadastrado")
        } else {
          const includeSchedule = new IncludeSchedule(menuPresentation.scheduleRepository)
          const includeScheduleResult = includeSchedule.execute(scheduleInfo)
          console.log()
          console.log(includeScheduleResult)
          console.log()
        }

        break;
      case 2:
        const verifyIfPatientExists = new VerifyPatientExists(menuPresentation.patientRepository)
        const scheduleDeleteInfo = new DeleteScheduleForm(menuPresentation.prompt).execute(verifyIfPatientExists)

        if (!scheduleDeleteInfo) {
          console.log("Erro: paciente não cadastrado")
        } else {
          const deleteScheduleResult = new DeleteSchedule(menuPresentation.scheduleRepository).execute(scheduleDeleteInfo)

          console.log()
          console.log(deleteScheduleResult)
          console.log()
        }

        break;
      case 3:
        const listType = menuPresentation.prompt("Apresentar a agenda T-Toda ou P-Período: ").toLowerCase()
        if (listType == "t") {
          const listSchedules = new ListSchedules(menuPresentation.scheduleRepository).execute()
          console.table(listSchedules)
        } else {
          const { startDate, endDate } = new ScheduleListForm(menuPresentation.prompt).execute()
          const schedulesInPeriod = new ListSchedulesByDates(menuPresentation.scheduleRepository).execute(startDate, endDate)
          console.log()
          console.table(schedulesInPeriod)
          console.log()
        }

        break;
      case 4:
        const mainMenu = new MainMenu();
        menuPresentation.setMenu(mainMenu);
        break;
      default:
        menuPresentation.setMenu(null);
        break;
    }
  }
}
