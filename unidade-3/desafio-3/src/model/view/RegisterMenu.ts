import { InsertPatientForm } from "./form/InsertPatientForm";
import { MainMenu } from "./MainMenu";
import { Menu } from "./Menu";
import { MenuPresentation } from "./MenuPresentation";
import { IncludePatient } from "../../useCases/patient/include-patient";
import { ListPatientsByName } from "../../useCases/patient/list-patients-by-name";
import { ListPatientsByCPF } from "../../useCases/patient/list-patients-by-cpf";
import { VerifyPatientExists } from "../../useCases/patient/verify-patient-exists";
import { DeletePatientForm } from "./form/DeletePatientForm";
import { DeletePatient } from "../../useCases/patient/delete-patient";
import { ListPatientFutureSchedule } from "../../useCases/schedule/list-patient-future-schedule";
import { Schedule } from "../Schedule";
import fixedWidthString from "fixed-width-string";

export class RegisterMenu extends Menu {
  constructor() {
    super("Menu do Cadastro de Pacientes", [
      "Cadastro novo paciente",
      "Excluir paciente",
      "Listar pacientes (ordenado por CPF)",
      "Listar pacientes (ordenado por nome)",
      "Voltar p/ menu principal",
    ]);
  }

  async selectOption(option: number, menuPresentation: MenuPresentation) {
    switch (option) {
      case 1:
        console.clear();
        const patientInfo = new InsertPatientForm(
          menuPresentation.prompt
        ).execute();
        const includePatient = new IncludePatient(
          menuPresentation.patientRepository
        );

        const includePatientResult = await includePatient.execute(patientInfo);
        console.log();
        console.log(includePatientResult);
        console.log();
        break;
      case 2:
        console.clear();
        const verifyPatientExists = new VerifyPatientExists(
          menuPresentation.patientRepository
        );
        const deletePatientForm = new DeletePatientForm(
          menuPresentation.prompt
        );
        const cpf = await deletePatientForm.execute(verifyPatientExists);

        if (cpf) {
          const deletePatient = new DeletePatient(
            menuPresentation.patientRepository,
            menuPresentation.scheduleRepository
          );
          const deletePatientResult = await deletePatient.execute(cpf);

          console.log();
          console.log(deletePatientResult);
          console.log();
        } else {
          console.log();
          console.log("Erro: não foi possível excluir o paciente");
          console.log();
        }

        break;
      case 3:
        //console.clear();
        const listPatientsByCPF = new ListPatientsByCPF(
          menuPresentation.patientRepository
        );

        //Retorna os pacientes ordenados por CPF
        const listPatientsByCPFResult = await listPatientsByCPF.execute();

        const listPatientFutureSchedule = new ListPatientFutureSchedule(
          menuPresentation.scheduleRepository
        );

        console.log("------------------------------------------------------");
        console.log("CPF          Nome                      Dt.Nasc.  Idade");
        console.log("------------------------------------------------------");

        listPatientsByCPFResult.map((patient) => {
          console.log(
            fixedWidthString(patient.cpf, 13) +
              fixedWidthString(patient.name, 26) +
              fixedWidthString(
                Schedule.dateObjectToString(new Date(patient.birthdate)),
                11
              ) +
              fixedWidthString(patient.age.toString(), 2)
          );

          const futureSchedules = listPatientFutureSchedule
            .execute(patient.cpf)
            .then((futureSchedules) => {
              if (!futureSchedules) {
                console.log(
                  "Erro - não foi possível buscar pelos agendamentos do paciente"
                );
              } else if (futureSchedules.length > 0) {
                const startHour = futureSchedules[0].startHour;
                const endHour = futureSchedules[0].endHour;
                console.log(
                  fixedWidthString("", 13) +
                    "Agendado para: " +
                    Schedule.dateObjectToString(
                      new Date(futureSchedules[0].date)
                    )
                );
                console.log(
                  fixedWidthString("", 13) +
                    `${startHour} às ${endHour}
              `
                );
              }
            });
        });
        console.log("------------------------------------------------------");
        break;
      case 4:
        //console.clear();
        const listPatientsByName = new ListPatientsByName(
          menuPresentation.patientRepository
        );

        //Retornar os pacientes ordenados por nome
        const listPatientsByNameResult = await listPatientsByName.execute();
        const listPatientsByNameFutureSchedule = new ListPatientFutureSchedule(
          menuPresentation.scheduleRepository
        );

        if (!listPatientsByNameResult) {
          console.log(
            "Erro - não foi possível buscar as informações do paciente"
          );
        } else {
          console.log("------------------------------------------------------");
          console.log("CPF          Nome                      Dt.Nasc.  Idade");
          console.log("------------------------------------------------------");

          listPatientsByNameResult.map(async (patient) => {
            const futureSchedules =
              await listPatientsByNameFutureSchedule.execute(patient.cpf);

            console.log(
              fixedWidthString(patient.cpf, 13) +
                fixedWidthString(patient.name, 26) +
                fixedWidthString(
                  Schedule.dateObjectToString(new Date(patient.birthdate)),
                  11
                ) +
                fixedWidthString(patient.age.toString(), 2)
            );

            if (!futureSchedules) {
              console.log(
                "Erro - não foi possível buscar pelos agendamentos do paciente"
              );
            } else if (futureSchedules.length > 0) {
              const startHour = futureSchedules[0].startHour;
              const endHour = futureSchedules[0].endHour;
              console.log(
                fixedWidthString("", 13) +
                  "Agendado para: " +
                  Schedule.dateObjectToString(new Date(futureSchedules[0].date))
              );
              console.log(
                fixedWidthString("", 13) +
                  `${startHour} às ${endHour}
              `
              );
            }
          });
          console.log("--------------------------------------------------");
        }

        break;
      case 5:
        const mainMenu = new MainMenu();
        menuPresentation.setMenu(mainMenu);
        break;
      default:
        menuPresentation.setMenu(null);
        break;
    }
  }
}
