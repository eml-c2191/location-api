import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
    imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    // static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
    // static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
    // static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
    // static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
    // static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';
  
    // static register(): DynamicModule {
    //   return {
    //     module: UsecasesProxyModule,
    //     providers: [
    //       {
    //         inject: [DatabaseTodoRepository],
    //         provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
    //         useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
    //       },
    //       {
    //         inject: [DatabaseTodoRepository],
    //         provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
    //         useFactory: (todoRepository: DatabaseTodoRepository) =>
    //           new UseCaseProxy(new getTodosUseCases(todoRepository)),
    //       },
    //       {
    //         inject: [LoggerService, DatabaseTodoRepository],
    //         provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
    //         useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
    //           new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
    //       },
    //       {
    //         inject: [LoggerService, DatabaseTodoRepository],
    //         provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
    //         useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
    //           new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
    //       },
    //       {
    //         inject: [LoggerService, DatabaseTodoRepository],
    //         provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
    //         useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
    //           new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
    //       },
    //     ],
    //     exports: [
    //       UsecasesProxyModule.GET_TODO_USECASES_PROXY,
    //       UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
    //       UsecasesProxyModule.POST_TODO_USECASES_PROXY,
    //       UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
    //       UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
    //     ],
    //   };
    // }
}
