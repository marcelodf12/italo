/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package italo.service;

import italo.Alumnos;
import italo.Cuotas;
import italo.Cursos;
import italo.Matriculas;
import italo.Pagos;
import italo.Promociones;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
@Path("italo.matriculas")
public class MatriculasFacadeREST extends AbstractFacade<Matriculas> {

    @PersistenceContext(unitName = "italoPU")
    private EntityManager em;

    public MatriculasFacadeREST() {
        super(Matriculas.class);
    }
    @GET
    @Path("/cuotas/{id}")
    @Consumes({"application/xml", "application/json"})
    public List<Cuotas> getCuotas(@PathParam("id") Integer id){
        return (List<Cuotas>)em
                .createQuery("SELECT c FROM Cuotas c WHERE (c.fkMatricula.id = :id) ORDER BY c.vencimiento")
                .setParameter("id", id)
                .getResultList();
    }
    
    @GET
    @Path("/pagos/{id}")
    @Consumes({"application/xml", "application/json"})
    public List<Pagos> pagos(@PathParam("id") Integer id){
        System.out.println(id);
        Query q= em.createQuery("SELECT p FROM Pagos p WHERE (p.fkMatricula.id = :id)");
        System.out.println("creado la consulta");
        q.setParameter("id", id);
        System.out.println("parametro");
        List<Pagos> pagos = q.getResultList();
        System.out.println("leer la lista");
        //for(Pagos p:pagos)
        //    p.setFkFactura(null);
        return pagos;
    }

    
    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Matriculas entity) {
        List<Cuotas> cuotas = new ArrayList();
        Cuotas c1 = new Cuotas();
        c1.setMonto(entity.getMatricula());
        c1.setFkMatricula(entity);
        c1.setVencimiento(1);
        cuotas.add(c1);
        int c;
        Cuotas cuota;
        for (c = 2; c < 12; c++) {
            cuota = new Cuotas();
            if (c == 2) {
                cuota.setMonto(entity.getCuota() / 2);
            } else {
                cuota.setMonto(entity.getCuota());
            }

            cuota.setVencimiento(c);
            cuota.setFkMatricula(entity);
            cuotas.add(cuota);
        }
        Cuotas c12 = new Cuotas();

        c12.setMonto(entity.getExamen());
        c12.setVencimiento(
                12);
        c12.setFkMatricula(entity);

        cuotas.add(c12);

        entity.setCuotasList(cuotas);

        entity.setFkAlumno(em.find(Alumnos.class, entity.getFkAlumno().getId()));
        entity.setFkCurso(em.find(Cursos.class, entity.getFkCurso().getId()));
        entity.setFkPromocion(em.find(Promociones.class, entity.getFkPromocion().getId()));
        System.out.println(entity);

        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Matriculas entity) {
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
    public Matriculas find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Path("alumnos/{id}")
    @Produces({"application/xml", "application/json"})
    public List<Matriculas> buscar(@PathParam("id") Integer id) {
        List<Matriculas> matriculas = em.createQuery("SELECT a FROM Matriculas a WHERE (a.fkAlumno.id = :id)")
                .setParameter("id", id)
                .getResultList();
        return matriculas;
    }
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Matriculas> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Matriculas> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @GET
    @Path("Matriculas/{id_curso}/{id_promocion}")
    @Produces({"application/xml", "application/json"})
    public List<Alumnos> findCurso(@PathParam("id_curso") String idCurso, @PathParam("id_promocion") String idPromocion) {
        System.out.println("·························");
        System.out.println(idCurso);
        System.out.println(idPromocion);
        System.out.println("·························");
        Cursos curso;
        curso = em.find(Cursos.class, Integer.parseInt(idCurso));
        Promociones promo;
        promo = em.find(Promociones.class, Integer.parseInt(idPromocion));
        List<Matriculas> matriculas = em.createQuery("SELECT a FROM Matriculas a WHERE (a.fkCurso = :curso and a.fkPromocion = :promocion)")
                .setParameter("curso", curso)
                .setParameter("promocion", promo)
                .getResultList();
        System.out.println(matriculas);
        List<Alumnos> alumnos = new ArrayList();
        for (Matriculas m : matriculas) {
            alumnos.add(m.getFkAlumno());
        }
        return alumnos;
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
