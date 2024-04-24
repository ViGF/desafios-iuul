//Não há mais a necessidade de apagar os agendamentos por usuário
//pq o relacionamento no BD está com a configuração CASCADE

// import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

// export class DeleteScheduleByUser {
//   constructor(private scheduleRepository: ScheduleRepository) {}

//   execute(cpf: string) {
//     this.scheduleRepository.deleteByUser(cpf)
//   }
// }