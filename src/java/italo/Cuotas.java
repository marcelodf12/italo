/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "cuotas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cuotas.findAll", query = "SELECT c FROM Cuotas c"),
    @NamedQuery(name = "Cuotas.findById", query = "SELECT c FROM Cuotas c WHERE c.id = :id"),
    @NamedQuery(name = "Cuotas.findByMonto", query = "SELECT c FROM Cuotas c WHERE c.monto = :monto"),
    @NamedQuery(name = "Cuotas.findByVencimiento", query = "SELECT c FROM Cuotas c WHERE c.vencimiento = :vencimiento")})
public class Cuotas implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "monto")
    private Integer monto;
    @Column(name = "vencimiento")
    private Integer vencimiento;
    @JoinColumn(name = "fk_matricula", referencedColumnName = "id")
    @ManyToOne
    private Matriculas fkMatricula;
    @OneToMany(mappedBy = "fkCuota")
    private Collection<Pagos> pagosCollection;

    public Cuotas() {
    }

    public Cuotas(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMonto() {
        return monto;
    }

    public void setMonto(Integer monto) {
        this.monto = monto;
    }

    public Integer getVencimiento() {
        return vencimiento;
    }

    public void setVencimiento(Integer vencimiento) {
        this.vencimiento = vencimiento;
    }

    public Matriculas getFkMatricula() {
        return fkMatricula;
    }

    public void setFkMatricula(Matriculas fkMatricula) {
        this.fkMatricula = fkMatricula;
    }

    @XmlTransient
    public Collection<Pagos> getPagosCollection() {
        return pagosCollection;
    }

    public void setPagosCollection(Collection<Pagos> pagosCollection) {
        this.pagosCollection = pagosCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cuotas)) {
            return false;
        }
        Cuotas other = (Cuotas) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "italo.Cuotas[ id=" + id + " ]";
    }
    
}
