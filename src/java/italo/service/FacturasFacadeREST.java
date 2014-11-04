/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package italo.service;

import com.google.gson.Gson;
import italo.Detallefactura;
import italo.Facturas;
import italo.Matriculas;
import italo.Pagos;
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
@Path("italo.facturas")
public class FacturasFacadeREST extends AbstractFacade<Facturas> {

    @PersistenceContext(unitName = "italoPU")
    private EntityManager em;

    public FacturasFacadeREST() {
        super(Facturas.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    @Override
    public void create(Facturas entity) {
        for (Detallefactura d : entity.getDetallefacturaList()) {
            System.out.println(d.getDescripcion());
        }
        Matriculas m = null;
        for (Pagos p : entity.getPagosList()) {
            System.out.println(p.getMonto());
            m = em.find(Matriculas.class, p.getFkMatricula().getId());
            p.setFkMatricula(null);
        }
        super.create(entity);
        for (Detallefactura d : entity.getDetallefacturaList()) {
            d.setFkFactura(entity);
        }
        for (Pagos p : entity.getPagosList()) {
            p.setFkFactura(entity);
            p.setFkMatricula(m);
        }
        super.edit(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Facturas entity) {
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
    public Facturas find(@PathParam("id") Integer id) {
        Facturas f = super.find(id);
        for (Detallefactura d : f.getDetallefacturaList()) {
            System.out.println(d);
        }
        return f;
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Facturas> findAll() {
        return (List<Facturas>) em
                .createQuery("SELECT d FROM Facturas d")
                .getResultList();
        //return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Facturas> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
