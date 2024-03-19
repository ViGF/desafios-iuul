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
        const patientInfo = new InsertPatientForm(menuPresentation.prompt).execute();
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
        const deletePatientForm = new DeletePatientForm(menuPresentation.prompt);
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
          console.log()
          console.log("Erro: não foi possível excluir o paciente")
          console.log()
        }

        break;
      case 3:
        console.clear();
        const listPatientsByCPF = new ListPatientsByCPF(
          menuPresentation.patientRepository
        );

        const listPatientsByCPFResult = listPatientsByCPF.execute();
        console.table(listPatientsByCPFResult);
        break;
      case 4:
        console.clear();
        const listPatientsByName = new ListPatientsByName(
          menuPresentation.patientRepository
        );

        const listPatientsByNameResult = listPatientsByName.execute();
        console.table(listPatientsByNameResult);
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
