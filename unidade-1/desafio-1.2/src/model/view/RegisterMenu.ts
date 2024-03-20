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

  selectOption(option: number, menuPresentation: MenuPresentation) {
    switch (option) {
      case 1:
        console.clear();
        const patientInfo = new InsertPatientForm(
          menuPresentation.prompt
        ).execute();
        const includePatient = new IncludePatient(
          menuPresentation.patientRepository
        );

        const includePatientResult = includePatient.execute(patientInfo);
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
        const cpf = deletePatientForm.execute(verifyPatientExists);

        if (cpf) {
          const deletePatient = new DeletePatient(
            menuPresentation.patientRepository,
            menuPresentation.scheduleRepository
          );
          const deletePatientResult = deletePatient.execute(cpf);

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
        console.clear();
        const listPatientsByCPF = new ListPatientsByCPF(
          menuPresentation.patientRepository
        );

        //Retornar os pacientes ordenados por CPF
        const listPatientsByCPFResult = listPatientsByCPF.execute();

        const listPatientsFutureSchedule = new ListPatientFutureSchedule(
          menuPresentation.patientRepository,
          menuPresentation.scheduleRepository
        );

        console.log("------------------------------------------------------");
        console.log("CPF          Nome                      Dt.Nasc.  Idade");
        console.log("------------------------------------------------------");
        listPatientsByCPFResult.map((patient) => {
          const futureSchedule = listPatientsFutureSchedule.execute(
            patient.cpf
          );
          console.log(
            fixedWidthString(patient.cpf, 13) +
              fixedWidthString(patient.name, 26) +
              fixedWidthString(patient.birthdate, 11) +
              fixedWidthString(patient.age.toString(), 2)
          );
          if (futureSchedule.length > 0) {
            const startHour = futureSchedule[0].startHour;
            const endHour = futureSchedule[0].endHour;
            console.log(
              fixedWidthString("", 13) +
                "Agendado para: " +
                Schedule.dateObjectToString(futureSchedule[0].date)
            );
            console.log(
              fixedWidthString("", 13) +
                `${Schedule.hourToPresentableFormat(
                  startHour
                )} às ${Schedule.hourToPresentableFormat(endHour)}
            `
            );
          }
        });
        console.log("--------------------------------------------------");
        break;
      case 4:
        console.clear();
        const listPatientsByName = new ListPatientsByName(
          menuPresentation.patientRepository
        );

        //Retornar os pacientes ordenados por nome
        const listPatientsByNameResult = listPatientsByName.execute();
        const listPatientsByNameFutureSchedule = new ListPatientFutureSchedule(
          menuPresentation.patientRepository,
          menuPresentation.scheduleRepository
        );

        console.log("------------------------------------------------------");
        console.log("CPF          Nome                      Dt.Nasc.  Idade");
        console.log("------------------------------------------------------");

        listPatientsByNameResult.map((patient) => {
          const futureSchedule = listPatientsByNameFutureSchedule.execute(
            patient.cpf
          );

          console.log(
            fixedWidthString(patient.cpf, 13) +
              fixedWidthString(patient.name, 26) +
              fixedWidthString(patient.birthdate, 11) +
              fixedWidthString(patient.age.toString(), 2)
          );

          if (futureSchedule.length > 0) {
            const startHour = futureSchedule[0].startHour;
            const endHour = futureSchedule[0].endHour;

            console.log(
              fixedWidthString("", 13) +
                "Agendado para: " +
                Schedule.dateObjectToString(futureSchedule[0].date)
            );
            console.log(
              fixedWidthString("", 13) +
                `${startHour.slice(0, 2)}:${startHour.slice(
                  2,
                  4
                )} às ${endHour.slice(0, 2)}:${endHour.slice(2, 4)}
            `
            );
          }
        });
        console.log("--------------------------------------------------");
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
