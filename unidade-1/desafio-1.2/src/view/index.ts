import PromptSync from "prompt-sync";
import { MainMenu } from "../model/view/MainMenu";
import { MenuPresentation } from "../model/view/MenuPresentation";
import { InMemoryPatientRepository } from "../repositories/patient/InMemoryPatientRepository";
import { InMemoryScheduleRepository } from "../repositories/schedule/InMemoryScheduleRepository";

const prompt = PromptSync({ sigint: true });

const inMemoryPatientRepository = new InMemoryPatientRepository();
const inMemoryScheduleRepository = new InMemoryScheduleRepository();
const mainMenu = new MainMenu();
const defaultMenu = new MenuPresentation(
  mainMenu,
  prompt,
  inMemoryPatientRepository,
  inMemoryScheduleRepository,
);
defaultMenu.init();
