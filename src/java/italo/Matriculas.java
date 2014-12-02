/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package italo;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "matriculas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Matriculas.findAll", query = "SELECT m FROM Matriculas m"),
    @NamedQuery(name = "Matriculas.findById", query = "SELECT m FROM Matriculas m WHERE m.id = :id"),
    @NamedQuery(name = "Matriculas.findByFecha", query = "SELECT m FROM Matriculas m WHERE m.fecha = :fecha"),
    @NamedQuery(name = "Matriculas.findByCuota", query = "SELECT m FROM Matriculas m WHERE m.cuota = :cuota"),
    @NamedQuery(name = "Matriculas.findByMatricula", query = "SELECT m FROM Matriculas m WHERE m.matricula = :matricula"),
    @NamedQuery(name = "Matriculas.findByExamen", query = "SELECT m FROM Matriculas m WHERE m.examen = :examen")})
public class Matriculas implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Size(max = 8)
    @Column(name = "fecha", length = 8)
    private String fecha;
    @Column(name = "cuota")
    private Integer cuota;
    @Column(name = "matricula")
    private Integer matricula;
    @Column(name = "examen")
    private Integer examen;
    @OneToMany(mappedBy = "fkMatricula",cascade = CascadeType.ALL)
    private List<Cuotas> cuotasList;
    @OneToMany(mappedBy = "fkMatricula",cascade = CascadeType.ALL)
    private List<Pagos> pagosList;
    @JoinColumn(name = "fk_promocion", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Promociones fkPromocion;
    @JoinColumn(name = "fk_curso", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Cursos fkCurso;
    @JoinColumn(name = "fk_alumno", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Alumnos fkAlumno;

    public Matriculas() {
    }

    public Matriculas(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Integer getCuota() {
        return cuota;
    }

    public void setCuota(Integer cuota) {
        this.cuota = cuota;
    }

    public Integer getMatricula() {
        return matricula;
    }

    public void setMatricula(Integer matricula) {
        this.matricula = matricula;
    }

    public Integer getExamen() {
        return examen;
    }

    public void setExamen(Integer examen) {
        this.examen = examen;
    }

    @XmlTransient
    public List<Cuotas> getCuotasList() {
        return cuotasList;
    }

    public void setCuotasList(List<Cuotas> cuotasList) {
        this.cuotasList = cuotasList;
    }

    @XmlTransient
    public List<Pagos> getPagosList() {
        return pagosList;
    }

    public void setPagosList(List<Pagos> pagosList) {
        this.pagosList = pagosList;
    }

    public Promociones getFkPromocion() {
        return fkPromocion;
    }

    public void setFkPromocion(Promociones fkPromocion) {
        this.fkPromocion = fkPromocion;
    }

    public Cursos getFkCurso() {
        return fkCurso;
    }

    public void setFkCurso(Cursos fkCurso) {
        this.fkCurso = fkCurso;
    }

    public Alumnos getFkAlumno() {
        return fkAlumno;
    }

    public void setFkAlumno(Alumnos fkAlumno) {
        this.fkAlumno = fkAlumno;
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
        if (!(object instanceof Matriculas)) {
            return false;
        }
        Matriculas other = (Matriculas) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        String r = "\n\nitalo.Matriculas[ id=" + id;
        r+=", cuota= " + cuota;
        r+=", matricula= " + matricula;
        r+=", examen= " + examen;
        r+=", alumno= " + fkAlumno.toString();
        r+=", curso= " + fkCurso.toString();
        r+=", promocion= " + fkPromocion.toString();
        r+=", cant_cuotas= " + cuotasList.size();
        r+= " ]\n\n";
        return r;
    }
    
}
