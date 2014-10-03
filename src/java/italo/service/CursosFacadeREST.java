/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo.service;

import italo.Cursos;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author marcelo
 */
@Stateless
@Path("italo.cursos")
public class CursosFacadeREST extends AbstractFacade<Cursos> {
    @PersistenceContext(unitName = "italoPU")
    private EntityManager em;

    public CursosFacadeREST() {
        super(Cursos.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Cursos entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Cursos entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Cursos find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Cursos> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Cursos> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }
    
    @GET
    @Path("filtrar/{filtro}")
    @Produces({"application/xml", "application/json"})
    public List<Cursos> findCurso(@PathParam("filtro") String filtro){
        System.out.println(filtro);
        List<Cursos> cursos = em.createQuery("SELECT c FROM Cursos c WHERE c.especialidad LIKE :especialidad")
                .setParameter("especialidad", filtro)
                .getResultList();
        System.out.println(cursos);
        return cursos;
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
