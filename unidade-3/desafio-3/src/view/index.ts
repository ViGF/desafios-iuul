import PromptSync from "prompt-sync";
import { MainMenu } from "../model/view/MainMenu";
import { MenuPresentation } from "../model/view/MenuPresentation";
import { InMemoryScheduleRepository } from "../repositories/schedule/InMemoryScheduleRepository";
import { PatientRepositoryImplementation } from "../repositories/patient/PatientRepositoryImplementation";

(async () => {
  const prompt = PromptSync({ sigint: true });
  
  const patientRepository = new PatientRepositoryImplementation();
  const inMemoryScheduleRepository = new InMemoryScheduleRepository();
  const mainMenu = new MainMenu();
  
  const defaultMenu = new MenuPresentation(
    mainMenu,
    prompt,
    patientRepository,
    inMemoryScheduleRepository
  );
  await defaultMenu.init();
})()
