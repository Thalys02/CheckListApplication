

function CheckListItens(){
    return (
        <section>
          <div className="checklist-count">ITENS</div>
          <div className="checkList-container">
            {/* {tarefas.map((tarefa) => ( */}
              <div title="Editar tarefa" className="checkList-element">
                <div
                  id={""}
                  className="checkList-description"
                  onClick={() => ""}
                >
                  <h3>
                    
                    <span className="protocolo-span"></span>
                  </h3>
    
                  <span className="usuario-span">
                    
                  </span>
                  <br />
                  <span className="dataCriacao-span">
                   
                  </span>
                </div>
                <button
                  title="Remover tarefa"
                  className="button-close"
                  onClick={() => "openModalExclusao(tarefa)"}
                >
               
                </button>
                <button
                  title="Editar tarefa"
                  className="button-edit"
                  onClick={() => ""}
                >
                 
                </button>
              </div>
            {/* ))} */}
          </div>
          <footer>
            <button className="button-add-checklist" onClick={""}>
              NOVO CHECKLIST
            </button>
          </footer>
    
         
        </section>
      );
}

export default CheckListItens;