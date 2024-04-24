import PromptSync from "prompt-sync";
import { MainMenu } from "../model/view/MainMenu";
import { MenuPresentation } from "../model/view/MenuPresentation";
import { PatientRepositoryImplementation } from "../repositories/patient/PatientRepositoryImplementation";
import { ScheduleRepositoryImplementation } from "../repositories/schedule/ScheduleRepositoryImplementation";
import { initModels } from "../database/models";
import { database } from "../database";

(async () => {
  const prompt = PromptSync({ sigint: true });
  initModels(database)

  const patientRepository = new PatientRepositoryImplementation();
  const scheduleRepository = new ScheduleRepositoryImplementation();

  const mainMenu = new MainMenu();
  
  const defaultMenu = new MenuPresentation(
    mainMenu,
    prompt,
    patientRepository,
    scheduleRepository
  );
  await defaultMenu.init();
})()
