import fixedWidthString from "fixed-width-string";
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
import { Schedule } from "../Schedule";

export class ScheduleMenu extends Menu {
  constructor() {
    super("Menu da Agenda", [
      "Agendar consulta",
      "Cancelar agendamento",
      "Listar agenda",
      "Voltar p/ menu principal",
    ]);
  }

  async selectOption(option: number, menuPresentation: MenuPresentation) {
    switch (option) {
      case 1:
        const scheduleInfo = new InsertScheduleForm(
          menuPresentation.prompt
        ).execute();
        const verifyPatientExists = await new VerifyPatientExists(
          menuPresentation.patientRepository
        ).execute(scheduleInfo.cpf);

        if (!verifyPatientExists) {
          console.log("Erro: paciente não cadastrado");
        } else {
          const includeSchedule = new IncludeSchedule(
            menuPresentation.scheduleRepository
          );
          const includeScheduleResult = await includeSchedule.execute(
            scheduleInfo
          );
          console.log();
          console.log(includeScheduleResult);
          console.log();
        }

        break;
      case 2:
        const verifyIfPatientExists = new VerifyPatientExists(
          menuPresentation.patientRepository
        );
        const scheduleDeleteInfo = await new DeleteScheduleForm(
          menuPresentation.prompt
        ).execute(verifyIfPatientExists);

        if (scheduleDeleteInfo) {
          //Busca por agendamentos na data informada pelo usuário
          let listSchedulesByDates = await new ListSchedulesByDates(
            menuPresentation.scheduleRepository
          ).execute(
            Schedule.dateObjectToString(scheduleDeleteInfo.date),
            Schedule.dateObjectToString(scheduleDeleteInfo.date)
          );

          if (!listSchedulesByDates) {
            console.log("Erro: não foi possível buscar pelo agendamento");
          } else if (listSchedulesByDates.length > 0) {
            //Compara hora do agendamento encontrado com a hora do agendamento a ser cancelado
            const startHourEqual =
              listSchedulesByDates[0].startHour == scheduleDeleteInfo.startHour;

            if (startHourEqual) {
              const deleteScheduleResult = await new DeleteSchedule(
                menuPresentation.scheduleRepository
              ).execute(scheduleDeleteInfo);

              console.log();
              console.log(deleteScheduleResult);
              console.log();
            } else {
              console.log("Erro: agendamento não encontrado");
            }
          } else {
            console.log("Erro: agendamento não encontrado");
          }
        }

        break;
      case 3:
        const listType = menuPresentation
          .prompt("Apresentar a agenda T-Toda ou P-Período: ")
          .toLowerCase();

        let listSchedules: Schedule[] | void = [];

        if (listType == "t") {
          listSchedules = await new ListSchedules(
            menuPresentation.scheduleRepository
          ).execute();
        } else if (listType == "p") {
          const { startDate, endDate } = new ScheduleListForm(
            menuPresentation.prompt
          ).execute();
          listSchedules = await new ListSchedulesByDates(
            menuPresentation.scheduleRepository
          ).execute(startDate, endDate);
        }

        if (!listSchedules) {
          console.log("Erro: não foi possível buscar pelo agendamento");
        } else {
          //console.clear();
          console.log(
            "-------------------------------------------------------------------"
          );
          console.log(
            "   Data    H. Ini H. Fim Tempo Nome                       Dt.Nasc. "
          );
          console.log(
            "-------------------------------------------------------------------"
          );

          listSchedules.map(async (schedule) => {
            const patient = await new VerifyPatientExists(
              menuPresentation.patientRepository
            ).execute(schedule.cpf);

            console.log(
              fixedWidthString(Schedule.dateObjectToString(new Date(schedule.date)), 11) +
                fixedWidthString(schedule.startHour, 7) +
                fixedWidthString(schedule.endHour, 7) +
                fixedWidthString(schedule.duration, 6) +
                fixedWidthString(patient!.name, 26) +
                fixedWidthString(patient!.birthdate, 11)
            );
          });
          console.log(
            "-------------------------------------------------------------------"
          );
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
